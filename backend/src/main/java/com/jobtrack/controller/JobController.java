package com.jobtrack.controller;

import com.jobtrack.model.JobApplication;
import com.jobtrack.model.JobStatus;
import com.jobtrack.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public ResponseEntity<List<JobApplication>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplication> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    public ResponseEntity<JobApplication> createJob(
            @Valid @RequestBody JobApplication job) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(jobService.createJob(job));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplication> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobApplication job) {
        return ResponseEntity.ok(jobService.updateJob(id, job));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<JobApplication>> searchJobs(
            @RequestParam String company) {
        return ResponseEntity.ok(jobService.searchByCompany(company));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<JobApplication>> filterJobs(
            @RequestParam JobStatus status) {
        return ResponseEntity.ok(jobService.filterByStatus(status));
    }
}
