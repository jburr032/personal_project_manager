package com.ppm_tool.ppm.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ppm_tool.ppm.domain.Backlog;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long>{
	
	Backlog findByProjectIdentifier(String Identifier);

}
