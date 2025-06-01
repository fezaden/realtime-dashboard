import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voice-recorder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recorder-card">
      <h2>Ses Kaydedici</h2>
      <div class="btn-group">
        <button 
          class="rec-btn start" 
          (click)="startRecording()" 
          [disabled]="isRecording">
          Kayda Başla
        </button>
        <button 
          class="rec-btn stop" 
          (click)="stopRecording()" 
          [disabled]="!isRecording">
          Kaydı Bitir
        </button>
      </div>
      <div *ngIf="audioUrl" class="audio-box">
        <audio [src]="audioUrl" controls></audio>
      </div>
      <div *ngIf="error" class="rec-error">{{error}}</div>
    </div>
  `,
  styles: [`
    .recorder-card {
      max-width: 410px;
      margin: 2.5rem auto;
      background: #fff;
      border-radius: 1.6rem;
      box-shadow: 0 6px 30px 0 rgba(50,80,130,0.13);
      padding: 2.2rem 1.4rem 1.4rem 1.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.7rem;
      min-height: 330px;
    }
    h2 {
      color: #1976d2;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
      text-align: center;
      font-weight: 600;
    }
    .btn-group {
      display: flex;
      gap: 1.1rem;
    }
    .rec-btn {
      font-size: 1.09rem;
      padding: 0.78rem 2.2rem;
      border-radius: 1.3rem;
      border: none;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(90deg, #1976d2 0%, #42a5f5 90%);
      box-shadow: 0 3px 12px #1976d235;
      cursor: pointer;
      transition: background 0.16s, filter 0.13s;
      outline: none;
      letter-spacing: 0.05em;
    }
    .rec-btn.start {
      background: linear-gradient(90deg, #43e97b 0%, #38f9d7 90%);
      color: #1a2637;
    }
    .rec-btn.stop {
      background: linear-gradient(90deg, #e53935 0%, #e35d5b 90%);
    }
    .rec-btn:disabled {
      opacity: 0.68;
      cursor: not-allowed;
      filter: grayscale(0.4);
    }
    .audio-box {
      width: 100%;
      background: #f6faff;
      border-radius: 1rem;
      padding: 1.2rem 0.8rem 0.9rem 0.8rem;
      display: flex;
      justify-content: center;
      box-shadow: 0 2px 12px #42a5f512;
      margin-top: 0.5rem;
    }
    audio {
      width: 100%;
      outline: none;
      border-radius: 0.6rem;
    }
    .rec-error {
      color: #fff;
      background: #e53935;
      font-size: 1rem;
      padding: 0.7rem 1.1rem;
      border-radius: 0.9rem;
      margin-top: 0.6rem;
      box-shadow: 0 2px 7px #e5393522;
      text-align: center;
      min-width: 180px;
    }
    @media (max-width: 540px) {
      .recorder-card { padding: 1rem 0.3rem 0.9rem 0.3rem; }
      .audio-box { padding: 0.5rem 0.1rem 0.5rem 0.1rem; }
      .btn-group { flex-direction: column; gap: 0.5rem;}
    }
  `]
})
export class VoiceRecorderComponent {
  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  audioUrl: string | null = null;
  isRecording = false;
  error = '';

  startRecording() {
    this.error = '';
    this.audioUrl = null;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.audioChunks = [];
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.isRecording = true;

        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.audioChunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.audioUrl = URL.createObjectURL(audioBlob);
          this.isRecording = false;
        };
      })
      .catch(() => {
        this.error = 'Mikrofon erişimi reddedildi!';
      });
  }

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
    }
  }
}
