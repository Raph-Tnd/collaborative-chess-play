package main.java.Common;

import main.java.Data.Entity.GameEntity;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<GameEntity, String> {}
