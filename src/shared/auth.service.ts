import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {

    public verifyBasicAuth(data: string): boolean {
        try {
            const b64auth = data.split(' ');
            if (b64auth[0] === 'Basic') {
                const [username, password] = Buffer.from(b64auth[1], 'base64')
                    .toString()
                    .split(':');
                if (username === process.env.BASIC_USER) {
                    if (password === process.env.BASIC_KEY) {
                        return true;
                    }
                }
            }
            return false;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }

}