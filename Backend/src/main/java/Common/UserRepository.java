package main.java.Common;

import main.java.Data.Entity.PlayerEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<PlayerEntity, String> {
}
