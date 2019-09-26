const Store = require('electron-store');
const uuidv4 = require('uuid/v4');
const path = require('path');

class DataStore extends Store {

    constructor(settings) {
        super(settings);
        this.tracks = this.getTracks()
    }

    clearTracks() {
        this.delete('tracks')
    }

    saveTracks() {
        this.set('tracks', this.tracks);
        return this;
    }

    getTracks() {
        return this.get('tracks') || []
    }

    addTracks(tracks) {
        const currentTracksPath = this.getTracks().map(
            track => track.path
        );
        console.log(currentTracksPath)

        const trackWithProps = tracks.map(
            track => ({
                id: uuidv4(),
                path: track,
                filename: path.basename(track)
            })
        ).filter(
            track => {
                console.log(currentTracksPath.indexOf(track.path))
                return currentTracksPath.indexOf(track.path) < 0
            }
        )
        this.tracks = [...this.tracks, ...trackWithProps];
        return this.saveTracks(this.tracks)
    }

}

module.exports = DataStore;
