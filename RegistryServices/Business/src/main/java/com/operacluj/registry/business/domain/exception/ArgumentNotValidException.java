package com.operacluj.registry.business.domain.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Map;

@Getter
@AllArgsConstructor
public class ArgumentNotValidException extends RuntimeException {

    Map<String, String> errorMap;
}
