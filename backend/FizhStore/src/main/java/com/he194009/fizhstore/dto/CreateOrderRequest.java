package com.he194009.fizhstore.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {
    private Long userId;
    private List<CartItemDTO> items;
}