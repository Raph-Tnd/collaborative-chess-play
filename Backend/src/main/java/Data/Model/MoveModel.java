package main.java.Data.Model;

import org.json.JSONException;
import org.json.JSONObject;

public class MoveModel {
    public String player;
    public String game_id;
    public int x1Coord;
    public int y1Coord;
    public int x2Coord;
    public int y2Coord;

    @Override
    public boolean equals(Object o) {
        if(!(o instanceof MoveModel))
            return false;

        MoveModel mm = (MoveModel) o;
        if(mm.x1Coord == this.x1Coord &&
                mm.x2Coord == this.x2Coord &&
                mm.y1Coord == this.y1Coord &&
                mm.y2Coord == this.y2Coord) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        return this.game_id.hashCode();
    }

    public static MoveModel FromString(String json) throws JSONException {
        MoveModel res = new MoveModel();
        JSONObject temp = new JSONObject(json);
        res.game_id = temp.getString("game_id");
        res.player = temp.getString("player");
        res.x1Coord = Integer.valueOf(temp.getString("x1Coord"));
        res.x2Coord = Integer.valueOf(temp.getString("x2Coord"));
        res.y1Coord = Integer.valueOf(temp.getString("y1Coord"));
        res.y2Coord = Integer.valueOf(temp.getString("y2Coord"));
        return res;
    }
}
