package main.java.Common;

import main.java.Data.Entity.PlayerEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<PlayerEntity, String> {
    @Query("SELECT COUNT(*) " +
            "FROM PlayerEntity " +
            "WHERE id_game = :playerId " +
            "AND name = :playerName")
    public int userAlreadyConnected(@Param("playerId") String playerId, @Param("playerName") String playerName);

    @Query("SELECT p " +
            "FROM PlayerEntity p " +
            "WHERE id_game = :playerId " +
            "AND name = :playerName")
    public PlayerEntity findByPlayerId(@Param("playerId") String playerId, @Param("playerName") String playerName);
}
