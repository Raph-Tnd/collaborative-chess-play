package main.java.Data.Model;

public class MoveModel {
    public String player;
    public int pieceId;
    public int xCoord;
    public int yCoord;

    @Override
    public boolean equals(Object o) {
        if(o == this)
            return true;

        if(!(o instanceof MoveModel))
            return false;

        MoveModel moveModel = (MoveModel) o;

        return(moveModel.player == this.player);
    }
}
