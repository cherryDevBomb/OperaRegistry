package com.operacluj.registry.business.service;

import com.operacluj.registry.business.domain.dto.DocumentTimelineItemDTO;

import java.util.List;
import java.util.Map;

public interface DocumentTimelineService {

    Map<String, List<DocumentTimelineItemDTO>> getDocumentTimeline(int registryNumber, boolean hasAttachedFiles);
}
