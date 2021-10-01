package main.java.Common.Synchronization;

import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionPlayerAlreadyVoted;
import java.util.HashMap;
import java.util.Map;

public class Lock {

    public Map<String, MoveModel> moves = new HashMap<>();

    public int votes = 0;

    public synchronized void waitAllVotes(int maxVote, MoveModel moveModel) throws InterruptedException, ExceptionPlayerAlreadyVoted {
        if(moves.containsKey(moveModel.player))
            throw new ExceptionPlayerAlreadyVoted(moveModel.player + " already voted for this turn");

        moves.put(moveModel.player, moveModel);
        votes++;
        //System.out.println(votes + " = " + maxVote + " ? " + (votes == maxVote));
        if (votes != maxVote) {
            wait();
        } else {
            notifyAll();
            votes = 0;
            moves = new HashMap<>();
        }
    }
}