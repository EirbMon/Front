import images from '../../../scss/images/eirbmon/index';

function choisirImage(name)
{
    var monImage;
    switch(name) {
        case 'Carabaffe':
            monImage = images['carabaffe'];
            break;
        case 'Carapuce':
            monImage = images['carapuce'];
            break;
        case 'Dracaufeu':
            monImage = images['dracaufeu'];
            break;
        case 'Pikachu':
            monImage = images['pikachu'];
            break;
        case 'Raichu':
            monImage = images['raichu'];
            break;
        case 'Reptincelle':
            monImage = images['reptincelle'];
            break;
        case 'Roucarnage':
            monImage = images['roucarnage'];
            break;
        case 'Roucoul':
            monImage = images['roucoul'];
            break;
        case 'Roucoups':
            monImage = images['roucoups'];
            break;
        case 'Salameche':
            monImage = images['salameche'];
            break;
        case 'Tortank':
            monImage = images['tortank'];
            break;
        default:
            monImage = images['pikachu'];
            break;
        }
    return monImage;
}

export default choisirImage;