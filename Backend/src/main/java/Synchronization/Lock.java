package main.java.Synchronization;

import main.java.Common.GameRepository;
import main.java.Data.Model.MoveModel;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Lock {

    public int votes = 0;
    private Map<String,MoveModel> moves = new HashMap<>();
    private MoveModel chosenMove = null;

    @Autowired
    GameRepository gameRepository;

    public void waitAllVotes(MoveModel moveModel) throws InterruptedException {
        int maxVote;
        if (moveModel.team == 0) {
            maxVote = gameRepository.findById(moveModel.game_id).get().w_players;
        } else {
            maxVote = gameRepository.findById(moveModel.game_id).get().b_players;
        }
        int newVotesCount = votes++;

        //TODO: ajouter le move a la hashmap

        if (newVotesCount != maxVote) {
            wait();
        } else {
            notifyAll();
            this.processChosenVote();
            this.votes = 0;
            this.moves = new HashMap<>();
        }
    }

    //TODO: impl func.
    private void processChosenVote(){};
}
