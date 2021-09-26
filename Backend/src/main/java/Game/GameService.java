package main.java.Game;

import main.java.Common.GameRepository;
import main.java.Data.Entity.GameEntity;
import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionGameAlreadyExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    public void vote(MoveModel moveModel) throws InterruptedException { //todo implémenter la synchro
        Thread.sleep(10000);
    }

    public String create() throws ExceptionGameAlreadyExist {

        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";
        StringBuilder sb = new StringBuilder(10);
        for (int i = 0; i < 10; i++) {
            int index = (int)(AlphaNumericString.length() * Math.random());
            sb.append(AlphaNumericString.charAt(index));
        }
        String id = sb.toString();

        if(gameRepository.existsById(id))
            throw new ExceptionGameAlreadyExist("This game id already exist");
        GameEntity gameEntity = new GameEntity();
        gameEntity.id = id;
        gameRepository.save(gameEntity);
        return id;
    }
}

