<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">
                    Author
                </th>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Description
                </th>
                <th class="text-left">
                    Date
                </th>
                <th class="text-left">
                    Link
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                    v-for="item in packages"
                    :key="item.package.name"
                    @click="showPackageInfo(item.package)"
            >
                <td>{{ item.package.author && item.package.author.name  || '--' }}</td>
                <td>{{ item.package.name || '--' }}</td>
                <td>{{ item.package.description || '--' }}</td>
                <td>{{ item.package.date || '--' }}</td>
                <td>
                    <a
                            v-if="item.package.links && item.package.links.npm"
                            :href="item.package.links.npm"
                            target="_blank"
                            @click.stop
                    >
                        link
                    </a>
                    <span v-else>
                        || '--'
                    </span>
                </td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
    export default {
        name: 'PackagesTable',
        props: {
            packages: {
                type: Array,
                default: () => [],
                require: true
            },
        },
        methods: {
            showPackageInfo(currentPackage)  {
                this.$emit('showPackageInfo', currentPackage)
            }
        },
    }
</script>
