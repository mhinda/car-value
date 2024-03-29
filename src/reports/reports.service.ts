import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>){}

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto);
        report.user = user;
        
        return this.repo.save(report);
    }

    async changeApproval(id: number, approved: boolean) {
        console.log(id);
        console.log(approved);
        const report = await this.repo.findOneBy({ id });
        console.log(report);
        if (!report) {
            throw new NotFoundException("Report not found")
        }

        report.approved = approved;

        return this.repo.save(report);
    }
}
