package com.operacluj.registry.business.domain.request;

import com.operacluj.registry.business.util.ErrorMessageConstants;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
public class DocumentForm {

    @NotBlank(message = ErrorMessageConstants.REQUIRED_FIELD)
    private String title;

    private String origin;

    private boolean originExternal;

    private boolean destinationExternal;

    @NotEmpty(message = ErrorMessageConstants.REQUIRED_FIELD)
    private List<String> recipients;

    private String sentMessage;
}
