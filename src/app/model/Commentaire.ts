export class Commentaire {
  id: number;
  produitId: number; // Lier le commentaire au produit
  auteur: string;
  texte: string;
  date: Date;

  constructor(
    id: number,
    produitId: number,
    auteur: string,
    texte: string,
    date: Date = new Date() // Default to the current date if not provided
  ) {
    this.id = id;
    this.produitId = produitId;
    this.auteur = auteur;
    this.texte = texte;
    this.date = date;
  }

  // Optional: Method to format the date to a readable string
  formatDate(): string {
    return this.date.toLocaleDateString('fr-FR'); // Change to the desired locale
  }
}
