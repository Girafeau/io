export default class Key {

  public static KEY_UP = 'z';
  public static KEY_DOWN = 's';
  public static KEY_LEFT = 'q';
  public static KEY_RIGHT = 'd';

  public static KEYS = {};
  public static KEY_UP_2 = 'w';
  public static KEY_LEFT_2 = 'a';

  public static push(key: string): void {
    Key.KEYS[key] = true;
  }

  public static pop(key: string): void {
    Key.KEYS[key] = false;
  }

}
