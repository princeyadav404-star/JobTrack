package com.jobtrack.service;

import com.jobtrack.exception.ResourceNotFoundException;
import com.jobtrack.model.JobApplication;
import com.jobtrack.model.JobStatus;
import com.jobtrack.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<JobApplication> getAllJobs() {
        return jobRepository.findAll();
    }

    public JobApplication getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Job application not found with id: " + id));
    }

    public JobApplication createJob(JobApplication job) {
        return jobRepository.save(job);
    }

    public JobApplication updateJob(Long id, JobApplication updatedJob) {
        JobApplication existing = getJobById(id);

        existing.setCompany(updatedJob.getCompany());
        existing.setRole(updatedJob.getRole());
        existing.setLocation(updatedJob.getLocation());
        existing.setAppliedDate(updatedJob.getAppliedDate());
        existing.setStatus(updatedJob.getStatus());

        return jobRepository.save(existing);
    }

    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Job application not found with id: " + id);
        }
        jobRepository.deleteById(id);
    }

    public List<JobApplication> searchByCompany(String company) {
        return jobRepository.findByCompanyContainingIgnoreCase(company);
    }

    public List<JobApplication> filterByStatus(JobStatus status) {
        return jobRepository.findByStatus(status);
    }
}
