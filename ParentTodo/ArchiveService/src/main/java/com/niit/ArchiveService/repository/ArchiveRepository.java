package com.niit.ArchiveService.repository;

import com.niit.ArchiveService.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchiveRepository extends MongoRepository<User,String> {
}
