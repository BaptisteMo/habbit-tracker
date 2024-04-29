export const protectedPaths = [
    "/dashboard", 
    "/profile"
]
import { Home, ClipboardCheck, Package, CircleUser, LogOut, Crosshair } from 'lucide-react';

export const training = [
    {nom: "Course", value: "Course", score: 3},
    {nom: "Boxe", value: "Boxe", score: 3},
    {nom: "Muscu", value: "Muscu", score: 3},
    {nom: "Léger", value: "Léger", score: 2},
    {nom: "Aucun", value: "Aucun", score: 0},

]
export const sommeil = [
    {nom: "Peu", value: "Peu", score: -1},
    {nom: "Moyen", value: "Moyen", score: 1},
    {nom: "Complet", value: "Complet", score: 3},

]
export const eau =[
    {nom: "Aucun", value: "Aucun", score: -1},
    {nom: "Peu", value: "Peu", score: 1},
    {nom: "Complet", value: "Complet", score: 3},

]
export const repas =[
    {nom: "Aucun", value: "Aucun", score: 0},
    {nom: "Cheat", value: "Cheat", score: -1},
    {nom: "Complet", value: "Complet", score: 3},
    {nom: "Incomplet", value: "Incomplet", score: 2},

]

export const marche = [
    {nom: "Peu", value :"Peu", score: -1},
    {nom: "Normal", value :"Normal", score: 0},
    {nom: "Beaucoup", value :"Beaucoup", score: 2},
    {nom: "Important", value :"Important", score: 3},
]

export const Weeklymessages = [
    "Bonne semaine !",
    "Joyeux lundi !",
    "Bonne journée !",
    "Bon début de semaine !",
    // Ajoutez autant de messages que vous le souhaitez
  ];
  

export const NavigationLinks = [
    {name : "Accueil", link: "/", icon :Home },
    {name : "Obectifs", link: "/objectifs", icon: Crosshair },
]
export const SubNav = [
    {name : "Profile", link: "#", icon :CircleUser },
    {name : "Deconnexion", link: "#", icon:LogOut },
]