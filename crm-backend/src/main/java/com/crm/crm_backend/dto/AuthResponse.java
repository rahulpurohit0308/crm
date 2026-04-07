package com.crm.crm_backend.dto;

import com.crm.crm_backend.entity.WorkspaceUser;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String name;
    private WorkspaceUser.Role role;
}