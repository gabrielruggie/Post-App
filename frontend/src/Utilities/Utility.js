/**
 * Utility class that contains static helper methods
 */
class Util {

    static clearTokenFromLocalStorage () {
        localStorage.removeItem("token");
    }

}

export default Util;