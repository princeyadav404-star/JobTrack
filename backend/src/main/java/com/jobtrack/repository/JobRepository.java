package com.jobtrack.repository;

import com.jobtrack.model.JobApplication;
import com.jobtrack.model.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<JobApplication, Long> {

    List<JobApplication> findByCompanyContainingIgnoreCase(String company);

    List<JobApplication> findByStatus(JobStatus status);
}
