import {stringify} from 'qs';

export default class NdsClient {
    #baseURL;
    #controller;

    constructor(host) {
        this.#baseURL = `http://${host}`;
        this.#controller = new AbortController();
    }

    async getDeviceStatistics() {
        return await fetch(`${this.#baseURL}/statistics`, {signal: this.#controller.signal})
            .then(r => r.json());
    }

    async getEffects() {
        return await fetch(`${this.#baseURL}/effects`, {signal: this.#controller.signal})
            .then(r => r.json());
    }

    async disableEffect(effectIndex) {
        const form = new FormData();
        form.append('effectIndex', effectIndex);

        return await fetch(`${this.#baseURL}/disableEffect`, {
            method: 'POST',
            body: form,
            signal: this.#controller.signal,
        });
    }

    async setCurrentEffect(effectIndex) {
        const form = new FormData();
        form.append('currentEffectIndex', effectIndex);

        return await fetch(`${this.#baseURL}/currentEffect`, {
            method: 'POST',
            body: form,
            signal: this.#controller.signal,
        });
    }

    async enableEffect(effectIndex) {
        const form = new FormData();
        form.append('effectIndex', effectIndex);

        return await fetch(`${this.#baseURL}/enableEffect`, {
            method: 'POST',
            body: form,
            signal: this.#controller.signal,
        })
    }

    dispose() {
        this.#controller.abort();
    }

    toString() {
        return `NdsClient[${this.#baseURL}]`;
    }
}
