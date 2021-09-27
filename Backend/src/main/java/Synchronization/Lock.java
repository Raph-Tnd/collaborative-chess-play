package main.java.Synchronization;

import main.java.Common.GameRepository;
import main.java.Data.Model.MoveModel;
import org.springframework.beans.factory.annotation.Autowired;

public class Lock {

    public int votes = 0;

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
        if (newVotesCount != maxVote) {
            wait();
        } else {
            notifyAll();
        }
    }
}
