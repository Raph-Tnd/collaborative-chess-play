package main.java.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@ControllerAdvice
public class HttpExceptions {

    @ExceptionHandler(value = ExceptionUserAlreadyConnected.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public void handleUserAlreadyConnectedException(ExceptionUserAlreadyConnected exception, HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.CONFLICT.value(), exception.getMessage());
    }

    @ExceptionHandler(value = ExceptionGameAlreadyExist.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public void handleGameAlreadyExistException(ExceptionGameAlreadyExist exception, HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.CONFLICT.value(), exception.getMessage());
    }

    @ExceptionHandler(value = ExceptionGameDoesNotExist.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public void handleGameDoesNotExistException(ExceptionGameDoesNotExist exception, HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }

    @ExceptionHandler(value = ExceptionPlayerAlreadyVoted.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public void handlePlayerAlreadyVotedException(ExceptionPlayerAlreadyVoted exception, HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.CONFLICT.value(), exception.getMessage());
    }

    @ExceptionHandler(value = ExceptionUserDoesNotExist.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public void handlePlayerAlreadyVotedException(ExceptionUserDoesNotExist exception, HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.CONFLICT.value(), exception.getMessage());
    }
}
