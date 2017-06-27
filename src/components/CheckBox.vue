<template lang="html">
    <label class="checkbox">
        <span class="checkbox__input" @click="action">
            <span :class="{'checkbox__inner': true, 'checkbox__inner--checked': value}"></span>
        </span>
        <span class="checkbox__label" @click="action">{{text}}</span>
    </label>
</template>

<script>
export default {
    name: 'checkbox',
    props: {
        text: { type: String, default: '' },
        value: { type: Boolean, default: false },
        action: { type: Function }
    }
}
</script>

<style lang="scss" scoped>
.checkbox {
    color: inherit;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: normal;
    margin-bottom: 16px;

    .checkbox__input {
        white-space: normal;
        cursor: pointer;
        outline: none;
        display: inline-block;
        line-height: 1;
        position: relative;
        vertical-align: middle;

        .checkbox__inner {
            display: inline-block;
            position: relative;
            border: 1px solid #bfcbd9;
            border-radius: 4px;
            box-sizing: border-box;
            width: 18px;
            height: 18px;
            background-color: #fff;
            z-index: 1;
            transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);

            &:after {
                box-sizing: content-box;
                content: "";
                border: 2px solid #fff;
                border-left: 0;
                border-top: 0;
                height: 8px;
                left: 5px;
                position: absolute;
                top: 1px;
                transform: rotate(45deg) scaleY(0);
                width: 4px;
                transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
                transform-origin: center;
            }

            &.checkbox__inner--checked {
                background-color: #20a0ff;
                border-color: #0190fe;

                &:after {
                    transform: rotate(45deg) scaleY(1);
                }
            }
        }
    }

    .checkbox__label {
        font-size: 14px;
        padding-left: 5px;
    }
}
</style>
