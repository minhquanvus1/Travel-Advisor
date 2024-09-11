package com.project.travel_advisor.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {

    // static function (can be called without object) to extract userEmail from "sub" in JWT
    // "extraction": is what we pass in that we want to search for, in this case, extraction = "sub"
    public static String payloadJWTExtraction(String token, String extraction) {

        // this is a Bearer token --> it has "Bearer " as prefix --> need to exclude the "Bearer " part to get only the JWT
        token.replace("Bearer ", "");

        // split the JWT into chunks, (split by ".") (index: 0 (header), 1 (payload), 2 (signature))
        String[] chunks = token.split("\\.");

        // create a "decoder" object to decode the JWT elements (because JWT is Base64 ENCODED)
        Base64.Decoder decoder = Base64.getUrlDecoder();

        // because we just want the "payload" --> just need to decode the "payload" (chunks[1])
        String payload = new String(decoder.decode(chunks[1]));

        try {
            // Use ObjectMapper to parse the JSON payload
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(payload);

            // Extract the desired field from the JSON payload
            JsonNode extractedNode = jsonNode.get(extraction);

            // Check if the extracted value is an array (e.g., permissions)
            if (extractedNode != null) {
                if (extractedNode.isArray()) {
                    // Convert array to a comma-separated string
                    StringBuilder result = new StringBuilder();
                    for (JsonNode node : extractedNode) {
                        result.append(node.asText()).append(",");
                    }
                    // Remove the trailing comma
                    if (result.length() > 0) {
                        result.setLength(result.length() - 1);
                    }
                    return result.toString();  // Return comma-separated string of array values
                } else {
                    return extractedNode.asText();  // Return plain string value (e.g., "sub")
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
