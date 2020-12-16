const express = require('express')
const router = express.Router()
const uploadMulter = require('../middleware/upload')
const validation = require('../middleware/validation')
const {
    createMateriel
} = require('../controllers/materiel.controllers')
const {
    getMateriels
} = require('../controllers/materiel.controllers')
const {
    getMateriel
} = require('../controllers/materiel.controllers')
const {
    deleteMateriel
} = require('../controllers/materiel.controllers')
const {
    updateDisponible
} = require('../controllers/materiel.controllers')
const {
    getMaterielType
}= require('../controllers/materiel.controllers')
const {
    getMaterielMarque
}= require('../controllers/materiel.controllers')
const {
    getMaterielLieu
}= require('../controllers/materiel.controllers')
const {
    filterMateriels
}= require('../controllers/materiel.controllers')



router.get('/getmateriel',getMateriels)
router.get('/:_id',getMateriel)
router.post('/add_materiel', uploadMulter, validation, createMateriel)
router.delete('/delete/:_id', deleteMateriel)
router.put('/updateDispo/:_id/:disponible',updateDisponible)
router.get('/getType',getMaterielType)
router.get('/getMarque',getMaterielMarque)
router.get('/getLieux',getMaterielLieu)
router.get("/findMateriel/:query",filterMateriels)

module.exports = router