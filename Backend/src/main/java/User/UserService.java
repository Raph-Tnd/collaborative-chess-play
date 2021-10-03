package main.java.User;

import main.java.Common.GameRepository;
import main.java.Data.Entity.GameEntity;
import main.java.Data.Entity.PlayerEntity;
import main.java.Data.Entity.PlayerId;
import main.java.Data.Model.PlayerModel;
import main.java.Data.Translator.PlayerTranslater;
import main.java.Exception.ExceptionGameDoesNotExist;
import main.java.Exception.ExceptionUserAlreadyConnected;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private GameRepository gameRepository;

    public void addPlayer(PlayerModel playerModel) throws ExceptionUserAlreadyConnected, ExceptionGameDoesNotExist {
        PlayerEntity playerEntity = PlayerTranslater.toEntity(playerModel);

        if(userRepository.userAlreadyConnected(playerEntity.id.getId_game(),playerEntity.id.getName()) == 1)
            throw new ExceptionUserAlreadyConnected("A user is already connected with this username");

        if(!gameRepository.existsById(playerEntity.id.getId_game()))
            throw new ExceptionGameDoesNotExist("This game does not exist");

        userRepository.save(playerEntity);
        GameEntity gameEntity = gameRepository.findById(playerEntity.id.getId_game()).get();
        if(playerModel.team == 0) {
            gameEntity.w_players++;
        } else {
            gameEntity.b_players++;
        }
        gameRepository.save(gameEntity);
    }

    public List<PlayerModel> getAllPlayer(String id) {
        Iterable<PlayerEntity> iterable = userRepository.findAll();
        List<PlayerModel> list = new ArrayList<PlayerModel>();
        for(PlayerEntity playerEntity : iterable) {
            if(playerEntity.id.getId_game().equals(id))
                list.add(PlayerTranslater.toModel(playerEntity));
        }
        return list;
    }
}

interface UserRepository extends CrudRepository<PlayerEntity, String> {
    @Query("SELECT COUNT(*) " +
            "FROM PlayerEntity " +
            "WHERE id_game = :playerId " +
            "AND name = :playerName")
    public int userAlreadyConnected(@Param("playerId") String playerId, @Param("playerName") String playerName);
}
