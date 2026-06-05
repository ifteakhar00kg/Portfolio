package com.ifteakar.portfolio_backend.controller;

import com.ifteakar.portfolio_backend.model.Project;
import com.ifteakar.portfolio_backend.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/projects")
@CrossOrigin(origins = "http://localhost:8080")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }

    @PostMapping
    public ResponseEntity<?> addProject(@RequestBody Project project) {
        try {
            Project savedProject = projectRepository.save(project);
            return ResponseEntity.ok().body(Map.of(
                    "success", true,
                    "message", "Project added successfully!",
                    "data", savedProject
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Failed to add project: " + e.getMessage()
            ));
        }
    }
}