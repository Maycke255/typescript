import TripsToSpace from "./types.ts";

class System {
    index () {
        const result = TripsToSpace.getAll();

        if (result.success === false) {
            return result;
        } else {
            return result;
        }
    }
}