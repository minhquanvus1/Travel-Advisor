package com.project.travel_advisor.service.stop;

import com.project.travel_advisor.dto.StopDto;
import com.project.travel_advisor.entity.Stop;

import java.util.List;

public interface StopService {

    List<StopDto> mapStopsToStopDtos(List<Stop> stops);
}
