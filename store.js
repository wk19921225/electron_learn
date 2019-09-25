const Store = require('electron-store');
const uuidv4 = require('uuid/v4');
const path = require('path');

class DataStore extends Store{

    constructor(settings) {
        super(settings);
        this.tracks = this.getTracks()
    }

    saveTracks() {
        this.set('tracks', this.tracks);
        return this;
    }

    getTracks() {
        return this.get('tracks') || []
    }

    addTracks(tracks) {
        const trackWithProps = tracks.map(
            track => ({
                id: uuidv4(),
                path: track,
                filename: path.basename(track)
            })
        ).filter(
            track => {
                const currentTracksPath = this.getTracks().map(
                    track => track.path
                );
                return currentTracksPath.indexOf(track) < 0;
            }
        )
        this.tracks = [...this.tracks, ...trackWithProps];
        return this.saveTracks(this.tracks)
    }

}

export default DataStore;
