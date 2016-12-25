/**
 * Created by samou on 22-11-16.
 */

require('../modeles/db');
var bcrypt = require('bcryptjs');
require('passport');

module.exports.inscriptionControleur =function (req, res, next) {
    res.render('inscription');

}

module.exports.connexionControleur =function (req, res, next) {
    res.render('connexion');

}

module.exports.profilControleur =function (req, res, next) {
    res.render('profil');

}

module.exports.panierControleur =function (req, res, next) {
    res.render('panier');

}

module.exports.addProduitPanier =function (req, res, next) {

    /*Panier.findOne({ utilisateur : req.body.nomUtilisateur }, { sort : { date : -1 } }, function (err,pan){
        if(err) console.error(err);
        console.log(pan);

        if(pan!=undefined){

        }
        else{
            Produit.findOne({ _id: req.body.prod }, function (err,produit) {
                if(err) console.error(err);

                var panier = new Panier ();
                panier.utilisateur=req.body.user;
                panier.status="en cours";
                //panier.date=;
            });

        }

    });

    /*if(Panier.findOne({ utilisateur : req.body.nomUtilisateur }, { sort : { date : -1 } })!=undefined){
        console.log(req.body.quantite + req.body.user);
    }
    else{
        console.log("test");
        //console.log(req.body.quantite + " petite phrase pour savoir où se trouve le problème " + req.body.user);
        var panier = new Panier({

        });
    }*/

    res.render('panier');

}

module.exports.addProduitControleur =function (req, res, next) {
    Categorie.find(function (err,categories) {
        res.render('addProduit', {tab_categories: categories});
    });
}

module.exports.addCategorieControleur =function (req, res, next) {
        res.render('addCategorie');
}

module.exports.postCreerCategorie =function (req, res, next) {

    var utilisateur=req.user;
    if(utilisateur!=undefined && utilisateur.role=="admin"){
        var cat = new Categorie ();

        cat.nom = req.body.Nom;
        cat.description = req.body.Description;
        cat.save();

        res.redirect('/produits/categories');
    }
    else{
        res.redirect('/wtf');
    }

}

module.exports.creerProduitLienControleur =function (req, res, next) {

    var utilisateur=req.user;
        if(utilisateur!=undefined && utilisateur.role=="admin"){

            var prod = new Produit ();
            var nbre = parseInt(req.body.Prix);

            if(nbre>1000000){
                console.log('test');
                prod.prix = 1000000;
            }
            else{
                console.log('essai');
                prod.prix = req.body.Prix;
            }

            prod.nom = req.body.Nom;
            //prod.prix = req.body.Prix;
            prod.categorie=req.body.Categoriess;
            prod.description = req.body.Description;
            if(req.body.Image == ""){
                prod.image = '/images/box.png';
            }
            else{
                prod.image = req.body.Image;
            }

            prod.save();
            res.redirect('/');


        }
        else{
            res.redirect("/wtf");
        }

}

module.exports.postinscriptionControleur =function (req, res, next) {

    if(req.body.nomUtilisateur!=undefined && req.body.mdpUtilisateur!=undefined){
        var user = new Utilisateur ();
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.mdpUtilisateur,salt);

        user.pseudo = req.body.nomUtilisateur;
        user.mdp = hash;
        user.role='user';
        user.avatar = '/images/anonyme.jpg';

        user.save();
    }

    res.redirect('/');

}

module.exports.postConnexionControleur =function (req, res, next) {

    Utilisateur.findOne({ pseudo : req.body.nomUtilisateur }, function(err,user){
        if(err) console.error(err);
        if(bcrypt.compareSync(req.body.mdpUtilisateur,user.mdp)){
            res.redirect('/');
        }
        else{
            res.redirect('/produits');
        }

    })

}

