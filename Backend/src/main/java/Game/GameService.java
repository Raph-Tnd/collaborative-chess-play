package main.java.Game;

import main.java.Common.GameRepository;
import main.java.Common.Monitor;
import main.java.Data.Entity.GameEntity;
import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionGameAlreadyExist;
import main.java.Exception.ExceptionGameDoesNotExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private Monitor commonMonitor;

    public void vote(MoveModel moveModel) throws InterruptedException { //todo implémenter la synchro
        commonMonitor.waitForAllVotes(moveModel.game_id);
    }

    public String create() throws ExceptionGameAlreadyExist {

        int n = 15;

        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        String id = sb.toString();

        if(gameRepository.existsById(id))
            throw new ExceptionGameAlreadyExist("This game id already exist");

        GameEntity gameEntity = new GameEntity();
        gameEntity.id = id;
        gameEntity.nb_players = 0;
        gameRepository.save(gameEntity);
        return id;
    }

    public void delete(String id) throws ExceptionGameDoesNotExist {
        if(!gameRepository.existsById(id))
            throw new ExceptionGameDoesNotExist("This game does not exist");

        gameRepository.deleteById(id);
    }
}

