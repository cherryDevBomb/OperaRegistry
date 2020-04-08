package com.operacluj.registry.persistence.repository.impl;

import com.operacluj.registry.persistence.repository.PaginationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@PropertySource("classpath:/pagination.properties")
public class PaginationRepositoryImpl implements PaginationRepository {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    @Value("${page_limit}")
    private int pageLimit;

    @Value("${getAllDocumentsCount}")
    private String getAllDocumentsCountQuery;

    @Override
    public int getPageLimit() {
        return pageLimit;
    }

    @Override
    public int getPageCountByTotalNumber(int total) {
        return Double.valueOf(Math.ceil((Double.valueOf(total) / pageLimit))).intValue();
    }

    @Override
    public int getAllDocumentsPageCount() {
        Integer allDocumentsCount = jdbcTemplate.queryForObject(getAllDocumentsCountQuery, new MapSqlParameterSource(), Integer.class);
        return getPageCountByTotalNumber(allDocumentsCount);
    }
}
