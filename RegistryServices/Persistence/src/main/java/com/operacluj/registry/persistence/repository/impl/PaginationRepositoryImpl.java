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

    @Value("${getAllDocumentsCreatedByCount}")
    private String getMyDocumentsCountQuery;

    @Value("${getAllDocumentsReceivedByCount}")
    private String getReceivedDocumentsCountQuery;

    @Value("${getAllArchivedDocumentsReceivedByCount}")
    private String getArchivedReceivedDocumentsCountQuery;

    @Override
    public int getPageLimit() {
        return pageLimit;
    }

    @Override
    public int getPageCountByTotalNumber(int total) {
        return Double.valueOf(Math.ceil(((double) total / pageLimit))).intValue();
    }

    @Override
    public int getAllDocumentsPageCount() {
        Integer allDocumentsCount = jdbcTemplate.queryForObject(getAllDocumentsCountQuery, new MapSqlParameterSource(), Integer.class);
        return getPageCountByTotalNumber(allDocumentsCount);
    }

    @Override
    public int getAllDocumentsCreatedByPageCount(int userId, boolean archived) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("createdby", userId);
        parameterSource.addValue("archived", archived);
        Integer allDocumentsCreatedBy = jdbcTemplate.queryForObject(getMyDocumentsCountQuery, parameterSource, Integer.class);
        return getPageCountByTotalNumber(allDocumentsCreatedBy);
    }

    @Override
    public int getAllDocumentsReceivedByPageCount(int userId, boolean resolved) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("internalrecipient", userId);
        parameterSource.addValue("resolved", resolved);
        Integer allDocumentsReceivedBy = jdbcTemplate.queryForObject(getReceivedDocumentsCountQuery, parameterSource, Integer.class);
        return getPageCountByTotalNumber(allDocumentsReceivedBy);
    }

    @Override
    public int getAllArchivedDocumentsReceivedByPageCount(int userId) {
        MapSqlParameterSource parameterSource = new MapSqlParameterSource();
        parameterSource.addValue("internalrecipient", userId);
        Integer allArchivedDocumentsReceivedBy = jdbcTemplate.queryForObject(getArchivedReceivedDocumentsCountQuery, parameterSource, Integer.class);
        return getPageCountByTotalNumber(allArchivedDocumentsReceivedBy);
    }
}
