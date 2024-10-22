export function RSALogic(input: string) {
  class RSA {
    private primes: Set<number>;
    public publicKey: number;
    private privateKey: number;
    private n: number;

    constructor() {
      this.primes = new Set<number>();
      this.publicKey = 0;
      this.privateKey = 0;
      this.n = 0;
      this.primeFiller();
      this.setKeys();
    }

    private primeFiller() {
      for (let num = 2; num < 250; num++) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) {
            isPrime = false;
            break;
          }
        }
        if (isPrime) {
          this.primes.add(num);
        }
      }
    }

    private pickRandomPrime(): number {
      const primeArray = Array.from(this.primes);
      const randomIndex = Math.floor(Math.random() * primeArray.length);
      const randomPrime = primeArray[randomIndex];
      this.primes.delete(randomPrime);
      return randomPrime;
    }

    private setKeys() {
      const prime1 = this.pickRandomPrime();
      const prime2 = this.pickRandomPrime();

      this.n = prime1 * prime2;
      const phi = (prime1 - 1) * (prime2 - 1);
      let e = 2;
      while (this.gcd(e, phi) !== 1) {
        e++;
      }
      this.publicKey = e;

      let d = 2;
      while ((d * e) % phi !== 1) {
        d++;
      }
      this.privateKey = d;
    }

    private gcd(a: number, b: number): number {
      while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
      }
      return a;
    }

    public encrypt(message: number): number {
      let encryptedText = 1;
      for (let i = 0; i < this.publicKey; i++) {
        encryptedText = (encryptedText * message) % this.n;
      }
      return encryptedText;
    }

    public decrypt(encryptedText: number): number {
      let decrypted = 1;
      for (let i = 0; i < this.privateKey; i++) {
        decrypted = (decrypted * encryptedText) % this.n;
      }
      return decrypted;
    }

    public encode(message: string): number[] {
      return Array.from(message).map((char) =>
        this.encrypt(char.charCodeAt(0)),
      );
    }

    public decode(encoded: number[]): string {
      let m = "";
      for (let i = 0; i < encoded.length; i++) {
        m += String.fromCharCode(this.decrypt(encoded[i]));
      }

      return m;
    }
  }

  const rsa = new RSA();
  const message = input;
  const encodedMessage = rsa.encode(message);

  console.log(encodedMessage);

  return rsa.decode(encodedMessage);
}
