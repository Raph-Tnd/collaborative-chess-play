package main.java.Synchronization;

import main.java.Data.Model.MoveModel;
import main.java.Exception.ExceptionNotPlayerTurn;
import main.java.Exception.ExceptionUserAlreadyPlayed;

import java.util.HashMap;
import java.util.Map;

public class Lock {

    public int votes = 0;
    private Map<String,MoveModel> moves = new HashMap<>();
    private MoveModel chosenMove = null;
    boolean isWhiteTurn = true;

    public synchronized void waitAllVotes(MoveModel moveModel, int maxVote, int team) throws InterruptedException, ExceptionUserAlreadyPlayed, ExceptionNotPlayerTurn {
        votes++;
        int newVotesCount = votes;
        if(this.moves.containsKey(moveModel.player))
            throw new ExceptionUserAlreadyPlayed("This user already played");
        if((this.isWhiteTurn && team == 0) || (!this.isWhiteTurn && team == 1))
            throw new ExceptionNotPlayerTurn("This is not currently your turn");

        this.moves.put(moveModel.player, moveModel);
        if (newVotesCount != maxVote) {
            wait();
        } else {
            System.out.println("Vote choisi, envoi possible");
            notifyAll();
            this.chosenMove = this.processChosenVote();
            this.votes = 0;
            this.moves = new HashMap<>();
            this.isWhiteTurn = !this.isWhiteTurn;
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
        System.out.println(moveModel);
        return moveModel;
    }

    public MoveModel getChosenMove() {
        return this.chosenMove;
    }
}
