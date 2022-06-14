

describe('POST /characters', function () {

    before(function () {
        cy.back2ThePast()
        cy.setToken()

    })

    it('Deve cadastrar um personagem', function () {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['Vingadores'],
            active: true
        }

        cy.postCharacter(character).then(function(response){
            expect(response.status).to.eql(201)
            cy.log(response.body.character_id)
            expect(response.body.character_id.length).to.eql(24)
        })
    })

    context('Quando o personagem ja existe', function () {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: [
                'Vingadoresda costa oeste',
                'irmandade de mutantes'
            ],
            active: true
        }

        before(function () {
            cy.postCharacter(character).then(function(response){
                expect(response.status).to.eql(201)
            })
        })

        it('Nao deve cadastrar duplicado', function () {
            cy.postCharacter(character).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })

    context.only('Quando deixo de informar campos obrigatorios', function () {        
        it('Se caso nao informar campo Name', function () {
            cy.fixture('character').then(function (character) {
                this.namevazio = character.characterNameIsEmpty
                cy.postCharacter(this.namevazio).then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Bad Request')
                    expect(response.body.validation.body.message).to.eql('\"name\" is required')
                })
            })

        })

        it('Se caso nao informar campo Alias', function () {
            cy.fixture('character').then(function (character) {
                this.aliasvazio = character.characterAliasIsEmpty
                cy.postCharacter(this.aliasvazio).then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Bad Request')
                    expect(response.body.validation.body.message).to.eql('\"alias\" is required')
                })
            })
        })

        it('Se caso nao informar campo Team', function () {
            cy.fixture('character').then(function (character) {
                this.teamvazio = character.characterTeamIsEmpty
                cy.postCharacter(this.teamvazio).then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Bad Request')
                    expect(response.body.validation.body.message).to.eql('\"team\" is required')
                })
            })
        })

        it('Se caso nao informar campo Active', function () {
            cy.fixture('character').then(function (character) {
                this.activevazio = character.characterActiveIsEmpty
                cy.postCharacter(this.activevazio).then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Bad Request')
                    expect(response.body.validation.body.message).to.eql('"active\" is required')
                })
            })
        })
    })
})

