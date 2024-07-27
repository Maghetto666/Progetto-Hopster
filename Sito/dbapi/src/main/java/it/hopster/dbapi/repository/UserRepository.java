package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
