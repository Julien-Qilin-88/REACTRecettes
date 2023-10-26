import React from 'react';
// import { Button } from 'primereact/button';

const MenuDuMois = () => {
    // const [semaine, setSemaine] = useState([]);
    // const [plats, setPlats] = useState({});
    // const [platsAffiches, setPlatsAffiches] = useState([]);
    // const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    // const periodes = ['midi', 'soir'];

    // const handleClick = () => {
    //     setSemaine(daysOfWeek);
    // };

    // const handleAddPlat = (jour, periode) => {
    //     if (!plats[jour] || !plats[jour][periode]) {
    //         alert("Veuillez saisir un plat avant d'ajouter !");
    //         return;
    //     }

    //     const nouveauPlat = plats[jour][periode];
    //     setPlats({ ...plats, [jour]: { ...plats[jour], [periode]: '' } });

    //     // Mettre à jour les plats affichés avec un identifiant unique pour pouvoir les supprimer
    //     const platAjoute = { id: Date.now(), jour, periode, plat: nouveauPlat };
    //     setPlatsAffiches([...platsAffiches, platAjoute]);
    // };

    // const handleRemovePlat = (id) => {
    //     const nouveauxPlatsAffiches = platsAffiches.filter((plat) => plat.id !== id);
    //     setPlatsAffiches(nouveauxPlatsAffiches);
    // };

    // const handleChangePlat = (jour, periode, plat) => {
    //     setPlats({ ...plats, [jour]: { ...plats[jour], [periode]: plat } });
    // };

    return (
        <div className="menu-du-mois">
            <h1>Menu du mois</h1>

            <p>EN COURS DE DEVELOPPEMENT</p>
            {/* <Button label="Afficher calendrier de la semaine" onClick={handleClick} />
            {semaine.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Jour</th>
                            <th>Midi</th>
                            <th>Soir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semaine.map((jour, index) => (
                            <tr key={index}>
                                <td>{jour}</td>
                                {periodes.map((periode) => (
                                    <td key={periode}>
                                        {plats[jour] ? (
                                            <>
                                                <input
                                                    type="text"
                                                    placeholder={`Plat ${periode}`}
                                                    value={plats[jour][periode] || ''}
                                                    onChange={(e) => handleChangePlat(jour, periode, e.target.value)}
                                                />
                                                <Button
                                                    label={`Ajouter plat ${periode}`}
                                                    onClick={() => handleAddPlat(jour, periode)}
                                                />
                                            </>

                                        ) : (
                                            <>
                                                <input
                                                    type="text"
                                                    placeholder={`Plat ${periode}`}
                                                    value=''
                                                    onChange={(e) => handleChangePlat(jour, periode, e.target.value)}
                                                />
                                                <Button
                                                    label={`Ajouter plat ${periode}`}
                                                    onClick={() => handleAddPlat(jour, periode)}
                                                />
                                            </>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {platsAffiches.length > 0 && (
                <div>
                    <h2>Plats ajoutés :</h2>
                    <ul>
                        {platsAffiches.map((item) => (
                            <li key={item.id}>
                                {item.jour} ({item.periode}): {item.plat}
                                <Button
                                    label="Supprimer"
                                    onClick={() => handleRemovePlat(item.id)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )} */}
        </div>
    );
};

export default MenuDuMois;
