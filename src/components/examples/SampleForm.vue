<template>

    <v-card>
        <v-toolbar flat outlined>
            <v-icon @click="close()">mdi-close</v-icon>

            <v-spacer />

            <v-toolbar-title>Edit</v-toolbar-title>

            <v-spacer />
            
            <v-btn @click="save()" small text>Save</v-btn>
        </v-toolbar>

        <!-- <v-card-title>
        </v-card-title>-->

        <v-card-text>
            <v-container>
                <v-row>
                    <v-text-field
                        label="Reference"
                        v-model="referenceLocal"
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label="Title"
                        v-model="titleLocal"
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label="Due"
                        required
                        placeholder="dd/mm/yyyy"
                    ></v-text-field>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import CoreUi from "../../framework/coreUi.js";

export default {
    name: "VSampleForm",
    props: {
        reference: String,
        title: String,
    },
    data: function () {
        return {
            referenceLocal: this.reference,
            titleLocal: this.title,
        };
    },
    mounted: function() {

        // Test that data is reactive
        this.titleLocal += " (reactive)"
        setTimeout(() => {
            this.titleLocal += " (ajax)"
        }, 1000)
    },
    methods: {
        save: function() {

            // Show a spinner then close
            var l = CoreUi.loading();
            setTimeout(() => {
                l.dismiss();
                this.close("my-result");
            }, 1000)
        },
        close: function(result) {
            this.$emit("close", result);
        }
    },
};
</script>
