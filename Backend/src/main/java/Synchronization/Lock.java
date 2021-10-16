package main.java.Synchronization;

import main.java.Common.GameRepository;
import main.java.Common.UserRepository;
import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionUserAlreadyPlayed;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Lock {

    public int votes = 0;
    private Map<String,MoveModel> moves = new HashMap<>();
    private MoveModel chosenMove = null;

    public synchronized void waitAllVotes(MoveModel moveModel, int maxVote) throws InterruptedException, ExceptionUserAlreadyPlayed {
        int newVotesCount = votes++;
        if(this.moves.containsKey(moveModel.player))
            throw new ExceptionUserAlreadyPlayed("This user already played");
        this.moves.put(moveModel.player, moveModel);

        if (newVotesCount != maxVote) {
            wait();
        } else {
            notifyAll();
            this.chosenMove = this.processChosenVote();
            this.votes = 0;
            this.moves = new HashMap<>();
        }
    }

    private MoveModel processChosenVote(){
        Map<MoveModel, Integer> map = new HashMap<>();
        MoveModel moveModel  = null;
        int nbMoveMax = 0;
        for(Map.Entry<String,MoveModel> entry : moves.entrySet()) {
            MoveModel value = entry.getValue();
            if(!map.containsKey(value)) {
                map.put(value, 1);
            } else {
                map.put(value, map.get(value) + 1);
            }

            if(map.get(value) > nbMoveMax) {
                moveModel = value;
                nbMoveMax = map.get(value);
            }
        }

        return moveModel;
    }

    public MoveModel getChosenMove() {
        return this.chosenMove;
    }
}
