describe('plugin.js', () => {

        it('compiles', () => {

            return import('../plugin.js').then(function() {
                // (it worked)
            })
        })
})
