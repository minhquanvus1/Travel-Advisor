package com.project.travel_advisor.mapper;

import com.project.travel_advisor.dto.DayDto;
import com.project.travel_advisor.entity.Day;
import com.project.travel_advisor.service.stop.StopService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DayMapper {

    private final StopService stopService;

    public DayDto mapToDayDto(Day day) {

        return new DayDto(
                day.getId(),
                day.getDayNumber(),
                stopService.mapStopsToStopDtos(day.getStops())
        );
    }
}
