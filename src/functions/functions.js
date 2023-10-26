export function couperTexteParMot(texte, nombreDeMots) {
    let mots = texte.split(' '); // Divisez le texte en un tableau de mots
    if (mots.length > nombreDeMots) {
        mots = mots.slice(0, nombreDeMots); // Coupe le tableau pour ne conserver que le nombre de mots spécifié
        return mots.join(' ') + '...'; // Joindre les mots et ajouter des points de suspension
    } else {
        return texte;
    }
}