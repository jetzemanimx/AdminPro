export class Usuario {
    constructor(
        public Name: string,
        public lastName: string,
        public Email: string,
        public Password: string,
        public Image?: string,
        public Role?: string,
        public Google?: boolean
    ) {
        
    }
}