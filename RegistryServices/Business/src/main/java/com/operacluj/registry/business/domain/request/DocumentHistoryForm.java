package com.operacluj.registry.business.domain.request;

import com.operacluj.registry.business.util.ErrorMessageConstants;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class DocumentHistoryForm {

    @Min(value = 0, message = ErrorMessageConstants.REQUIRED_FIELD)
    private int registryNumber;

    @NotEmpty(message = ErrorMessageConstants.REQUIRED_FIELD)
    private List<String> recipients;

    private String sentMessage;
}
